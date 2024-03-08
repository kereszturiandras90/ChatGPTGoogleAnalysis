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
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=Translations;Trusted_Connection=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Translation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Translat__3214EC070A63DEA6");

            entity.ToTable("Translation");

            entity.Property(e => e.Feedback).HasMaxLength(400);
            entity.Property(e => e.FeedbackGoogle).HasMaxLength(400);
            entity.Property(e => e.FeedbackGpt)
                .HasMaxLength(400)
                .HasColumnName("FeedbackGPT");
            entity.Property(e => e.InputText).HasMaxLength(4000);
            entity.Property(e => e.OutputTextGoogle).HasMaxLength(4000);
            entity.Property(e => e.OutputTextGpt)
                .HasMaxLength(4000)
                .HasColumnName("OutputTextGPT");
            entity.Property(e => e.SourceLanguage).HasMaxLength(2);
            entity.Property(e => e.TargetLanguage).HasMaxLength(2);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
