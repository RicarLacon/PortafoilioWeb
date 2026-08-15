using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/cv")]
public sealed class CvController : ControllerBase
{
    private const string CvDirectory = "CV";

    private static readonly IReadOnlyDictionary<string, CvDefinition> CvFiles =
        new Dictionary<string, CvDefinition>(StringComparer.OrdinalIgnoreCase)
        {
            ["es"] = new("Imagen web ES.pdf", "Ricardo-Murillo-CV-ES.pdf"),
            ["en"] = new("Imagen web ENG.docx.pdf", "Ricardo-Murillo-CV-EN.pdf"),
        };

    private readonly IWebHostEnvironment _environment;
    private readonly ILogger<CvController> _logger;

    public CvController(IWebHostEnvironment environment, ILogger<CvController> logger)
    {
        _environment = environment;
        _logger = logger;
    }

    [HttpGet("{language}")]
    [Produces("application/pdf")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status500InternalServerError)]
    public IActionResult Download(string language)
    {
        var normalizedLanguage = language.Trim();

        if (!CvFiles.TryGetValue(normalizedLanguage, out var cv))
        {
            return NotFound(new ProblemDetails
            {
                Title = "Idioma no disponible",
                Detail = "El CV solicitado solo está disponible en español o inglés.",
                Status = StatusCodes.Status404NotFound,
            });
        }

        var filePath = Path.Combine(
            _environment.WebRootPath,
            "frontend",
            CvDirectory,
            cv.SourceFileName
        );

        if (!System.IO.File.Exists(filePath))
        {
            _logger.LogError("No se encontró el archivo de CV configurado para {Language}.", language);

            return Problem(
                title: "CV temporalmente no disponible",
                detail: "El archivo solicitado no pudo ser localizado.",
                statusCode: StatusCodes.Status500InternalServerError
            );
        }

        return PhysicalFile(
            filePath,
            "application/pdf",
            cv.DownloadFileName,
            enableRangeProcessing: true
        );
    }

    private sealed record CvDefinition(string SourceFileName, string DownloadFileName);
}
