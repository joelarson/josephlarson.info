from django.db import models
from django.contrib import admin
from django.forms import CheckboxSelectMultiple

from projects.models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """Admin customizations for the Project model."""
    formfield_overrides = {
        models.ManyToManyField: {'widget': CheckboxSelectMultiple},
    }
