var publishedWebRoot = Path.Combine(AppContext.BaseDirectory, "wwwroot");
var webRootPath = File.Exists(Path.Combine(publishedWebRoot, "index.html"))
    ? publishedWebRoot
    : FindRepositoryWebRoot(AppContext.BaseDirectory);

if (webRootPath is null)
{
    throw new InvalidOperationException("No se encontró index.html en la raíz web configurada.");
}

var builder = WebApplication.CreateBuilder(
    new WebApplicationOptions
    {
        Args = args,
        ContentRootPath = AppContext.BaseDirectory,
        WebRootPath = webRootPath,
    }
);

builder.Logging.ClearProviders();
builder.Logging.AddConfiguration(builder.Configuration.GetSection("Logging"));
builder.Logging.AddConsole();

builder.Services.AddControllers();
builder.Services.AddProblemDetails();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler();
    app.UseHsts();
    app.UseHttpsRedirection();
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();

static string? FindRepositoryWebRoot(string startPath)
{
    var directory = new DirectoryInfo(startPath);

    while (directory is not null)
    {
        var hasIndex = File.Exists(Path.Combine(directory.FullName, "index.html"));
        var hasScripts = Directory.Exists(Path.Combine(directory.FullName, "scripts"));

        if (hasIndex && hasScripts)
        {
            return directory.FullName;
        }

        directory = directory.Parent;
    }

    return null;
}
