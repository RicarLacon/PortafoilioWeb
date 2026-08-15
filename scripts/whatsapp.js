const whatsappPhone = "50684562629";
const whatsappButton = document.querySelector(".whatsapp-button");

const updateWhatsappLink = () => {
    if (!whatsappButton) {
        return;
    }

    const whatsappMessage = window.portfolioI18n?.t("whatsapp.message") ?? "";
    const encodedMessage = encodeURIComponent(whatsappMessage);
    whatsappButton.href = `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;
};

window.addEventListener("portfolio:languagechange", updateWhatsappLink);
updateWhatsappLink();
