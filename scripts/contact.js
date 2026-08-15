const form = document.querySelector("#contact-form");
const statusMessage = document.querySelector("#form-status");
const submitButton = form?.querySelector(".form-submit");
const translate = (key) => window.portfolioI18n?.t(key) ?? key;

const setSubmitting = (isSubmitting) => {
    submitButton.disabled = isSubmitting;
    submitButton.classList.toggle("is-loading", isSubmitting);
    form.setAttribute("aria-busy", String(isSubmitting));
};

const showStatus = (messageKey, type) => {
    statusMessage.dataset.statusKey = messageKey;
    statusMessage.textContent = translate(messageKey);
    statusMessage.className = `form-status form-status-${type}`;
};

const sendForm = async () => {
    setSubmitting(true);
    showStatus("form.status.sending", "pending");

    try {
        const response = await fetch(
            "https://formsubmit.co/ajax/ricardomurillopicado210607@gmail.com",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: new FormData(form),
            },
        );

        if (!response.ok) {
            throw new Error("No se pudo completar el envío.");
        }

        form.reset();
        form.querySelectorAll(".is-valid").forEach((field) => {
            field.classList.remove("is-valid");
        });
        showStatus("form.status.success", "success");
    } catch (error) {
        showStatus("form.status.error", "error");
    } finally {
        setSubmitting(false);
    }
};

let validation;

if (form && window.JustValidate) {
    validation = new window.JustValidate(form, {
        errorFieldCssClass: "is-invalid",
        successFieldCssClass: "is-valid",
        errorLabelCssClass: "field-error",
        focusInvalidField: true,
    });

    validation
        .addField("#nombre", [
            {
                rule: "required",
                errorMessage: () => translate("validation.name.required"),
            },
            {
                rule: "minLength",
                value: 2,
                errorMessage: () => translate("validation.name.minLength"),
            },
            {
                rule: "maxLength",
                value: 80,
                errorMessage: () => translate("validation.name.maxLength"),
            },
        ])
        .addField("#correo", [
            {
                rule: "required",
                errorMessage: () => translate("validation.email.required"),
            },
            {
                rule: "email",
                errorMessage: () => translate("validation.email.invalid"),
            },
            {
                rule: "maxLength",
                value: 120,
                errorMessage: () => translate("validation.email.maxLength"),
            },
        ])
        .addField("#asunto", [
            {
                rule: "required",
                errorMessage: () => translate("validation.topic.required"),
            },
            {
                rule: "minLength",
                value: 3,
                errorMessage: () => translate("validation.topic.minLength"),
            },
            {
                rule: "maxLength",
                value: 120,
                errorMessage: () => translate("validation.topic.maxLength"),
            },
        ])
        .addField("#mensaje", [
            {
                rule: "required",
                errorMessage: () => translate("validation.message.required"),
            },
            {
                rule: "minLength",
                value: 10,
                errorMessage: () => translate("validation.message.minLength"),
            },
            {
                rule: "maxLength",
                value: 1500,
                errorMessage: () => translate("validation.message.maxLength"),
            },
        ])
        .onSuccess((event) => {
            event.preventDefault();
            sendForm();
        });
}

window.addEventListener("portfolio:languagechange", () => {
    validation?.refresh();
});
