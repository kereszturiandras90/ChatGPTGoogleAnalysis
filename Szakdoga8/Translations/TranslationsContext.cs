using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Szakdoga8.Translations;

public partial class TranslationsContext : DbContext
{
    public TranslationsContext()
    {
    }

    public TranslationsContext(DbContextOptions<TranslationsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Translation> Translations { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

        => optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\\Translations\\Translations.mdf;Integrated Security=true;MultipleActiveResultSets=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Translation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Translat__3214EC070A63DEA6");

            entity.ToTable("Translation");

            entity.Property(e => e.Classification).HasMaxLength(4000);
            entity.Property(e => e.DateTimeOfTranslation)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Feedback).HasMaxLength(400);
            entity.Property(e => e.FeedbackGoogle).HasMaxLength(400);
            entity.Property(e => e.FeedbackGpt)
                .HasMaxLength(400)
                .HasColumnName("FeedbackGPT");
            entity.Property(e => e.GoogleBackTranslation).HasMaxLength(4000);
            entity.Property(e => e.GoogleBleu).HasColumnName("GoogleBLEU");
            entity.Property(e => e.GptBackTranslation).HasMaxLength(4000);
            entity.Property(e => e.Gptbleu).HasColumnName("GPTBLEU");
            entity.Property(e => e.InputText).HasMaxLength(4000);
            entity.Property(e => e.OutputTextGoogle).HasMaxLength(4000);
            entity.Property(e => e.OutputTextGpt)
                .HasMaxLength(4000)
                .HasColumnName("OutputTextGPT");
            entity.Property(e => e.ReferenceTranslation).HasMaxLength(4000);
            entity.Property(e => e.SourceLanguage).HasMaxLength(2);
            entity.Property(e => e.TargetLanguage).HasMaxLength(2);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
