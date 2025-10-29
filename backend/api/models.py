from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField

# Create your models here.


class Note(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["-created_at"]


class Preacher(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]


class Sermon(models.Model):
    title = models.CharField(max_length=200)
    preacher = models.ForeignKey(
        Preacher, on_delete=models.CASCADE, related_name="sermons"
    )
    youtube_url = models.URLField()
    note = models.OneToOneField(
        Note,
        on_delete=models.CASCADE,
        related_name="sermon_note",
    )
    date_uploaded = models.DateField(auto_now_add=True)
    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="uploaded_sermons",
    )

    def __str__(self):
        return f"{self.title} by {self.preacher.name}"

    class Meta:
        ordering = ["-date_uploaded"]
        verbose_name_plural = "Sermons"


class Telegram_audio(models.Model):
    title = models.CharField(max_length=200)
    audio_file = CloudinaryField(
        resource_type="auto", folder="sermon_audios/", blank=False, null=False
    )
    date_uploaded = models.DateField(auto_now_add=True)
    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="telegram_audios",
    )

    def __str__(self):
        return self.title

    @property
    def audio_url(self):
        """Get the Cloudinary URL for the audio file"""
        if self.audio_file:
            return self.audio_file.url
        return None

    class Meta:
        ordering = ["-date_uploaded"]
        verbose_name = "Telegram Audio"
        verbose_name_plural = "Telegram Audios"
