from django.contrib import admin
from django.contrib.admin import sites
from .models import Note, Sermon, Preacher, Telegram_audio
from django.contrib.auth.models import Group

# customize admin site headers
admin.site.site_header = "Sermon Administration"
admin.site.site_title = "Sermon Admin Portal"
admin.site.index_title = "Welcome to the Sermon Admin Portal"

# Unregister Group model
admin.site.unregister(Group)


# Note Admin
@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ("title", "owner", "created_at", "description_preview")
    list_filter = ("created_at", "owner")
    search_fields = ("title", "description", "owner__username")
    readonly_fields = ("created_at",)

    def description_preview(self, obj):
        return (
            obj.description[:50] + "..."
            if len(obj.description) > 50
            else obj.description
        )

    description_preview.short_description = "Description Preview"


# Preacher Admin
@admin.register(Preacher)
class PreacherAdmin(admin.ModelAdmin):
    list_display = ("name", "sermon_count")
    search_fields = ("name",)

    def sermon_count(self, obj):
        return obj.preacher.count()

    sermon_count.short_description = "Number of Sermons"


# Sermon Admin
@admin.register(Sermon)
class SermonAdmin(admin.ModelAdmin):
    list_display = ("title", "preacher", "date_uploaded", "uploaded_by", "youtube_link")
    list_filter = ("preacher", "date_uploaded", "uploaded_by")
    search_fields = ("title", "preacher__name", "note__title")
    readonly_fields = ("date_uploaded",)

    def youtube_link(self, obj):
        if obj.youtube_url:
            from django.utils.html import format_html

            return format_html(
                '<a href="{}" target="_blank">Watch</a>', obj.youtube_url
            )
        return "No URL"

    youtube_link.short_description = "YouTube"


# Telegram Audio Admin
@admin.register(Telegram_audio)
class TelegramAudioAdmin(admin.ModelAdmin):
    list_display = ("title", "date_uploaded", "uploaded_by")
    list_filter = ("date_uploaded", "uploaded_by")
    search_fields = ("title", "uploaded_by__username")
    readonly_fields = ("date_uploaded",)
