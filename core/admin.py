from django.db import models
from django.contrib import admin
from django.forms import CheckboxSelectMultiple

from .models import Category, Project, Post


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """Admin customizations for the Project model."""
    formfield_overrides = {
        models.ManyToManyField: {'widget': CheckboxSelectMultiple},
    }


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    """Admin customizations for the Project model."""
    formfield_overrides = {
        models.ManyToManyField: {'widget': CheckboxSelectMultiple},
    }


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Admin customizations for the Category model."""
    pass
