using System;
using System.Collections.Generic;

namespace Szakdoga8.Translations;

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
}
