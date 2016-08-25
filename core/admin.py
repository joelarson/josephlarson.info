from django.db import models
from django.contrib import admin
from django.forms import CheckboxSelectMultiple, ModelForm
import ghostdown

from .models import Category, Project, Post


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """Admin customizations for the Project model."""
    formfield_overrides = {
        models.ManyToManyField: {'widget': CheckboxSelectMultiple},
    }


class PostAdminForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['body'].widget = ghostdown.forms.widgets.GhostdownInput()


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    """Admin customizations for the Project model."""
    form = PostAdminForm

    formfield_overrides = {
        models.ManyToManyField: {'widget': CheckboxSelectMultiple},
    }




@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Admin customizations for the Category model."""
    pass
