using System;
using System.Collections.Generic;

namespace Szakdoga8.Models;

public partial class Translation
{
    public long Id { get; set; }

    public string? InputText { get; set; }

    public string? OutputTextGoogle { get; set; }

    public string? OutputTextGpt { get; set; }

    public string SourceLanguage { get; set; } = null!;

    public string TargetLanguage { get; set; } = null!;

    public string? FeedbackGoogle { get; set; }

    public string? FeedbackGpt { get; set; }

    public string? Feedback { get; set; }

    public double? GoogleBleu { get; set; }

    public double? Gptbleu { get; set; }

    public string? ReferenceTranslation { get; set; }

    public DateTime? DateTimeOfTranslation { get; set; }

    public string? Categories { get; set; }

    public byte? GptLike { get; set; }

    public byte? GoogleLike { get; set; }
}
