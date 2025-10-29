from django.contrib import admin
from .models import Note, Sermon, Preacher, Telegram_audio
from django.contrib.auth.models import Group

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ("title", "owner", "created_at", "description_preview")
    list_filter = ("created_at", "owner")
    search_fields = ("title", "description")
    readonly_fields = ("created_at",)

    def description_preview(self, obj):
        return (
            obj.description[:100] + "..."
            if len(obj.description) > 100
            else obj.description
        )

    description_preview.short_description = "Description"


@admin.register(Preacher)
class PreacherAdmin(admin.ModelAdmin):
    list_display = ("name", "sermon_count")
    search_fields = ("name",)

    def sermon_count(self, obj):
        return obj.sermons.count()

    sermon_count.short_description = "Sermons"


@admin.register(Sermon)
class SermonAdmin(admin.ModelAdmin):
    list_display = ("title", "preacher", "date_uploaded", "uploaded_by", "youtube_link")
    list_filter = ("preacher", "date_uploaded", "uploaded_by")
    search_fields = ("title", "preacher__name")
    readonly_fields = ("date_uploaded",)

    def youtube_link(self, obj):
        from django.utils.html import format_html

        return format_html('<a href="{}" target="_blank">Watch</a>', obj.youtube_url)

    youtube_link.short_description = "YouTube"


@admin.register(Telegram_audio)
class TelegramAudioAdmin(admin.ModelAdmin):
    list_display = ("title", "uploaded_by", "date_uploaded", "audio_preview")
    list_filter = ("date_uploaded", "uploaded_by")
    search_fields = ("title",)
    readonly_fields = ("date_uploaded",)

    def audio_preview(self, obj):
        if obj.audio_file:
            from django.utils.html import format_html

            return format_html(
                '<audio controls style="height: 30px; width: 200px;">'
                '<source src="{}">'
                "Your browser does not support the audio element."
                "</audio>",
                obj.audio_file.url,
            )
        return "No audio"

    audio_preview.short_description = "Audio"


admin.site.unregister(Group)