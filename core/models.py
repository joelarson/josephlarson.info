from django.db import models

from taggit.managers import TaggableManager
from django_extensions.db.models import AutoSlugField, TimeStampedModel


class Category(TimeStampedModel):
    slug = AutoSlugField(populate_from=['name'], unique=True, editable=True)
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'categories'


class Post(TimeStampedModel):
    slug = AutoSlugField(populate_from=['title'], unique=True, editable=True)
    title = models.CharField(max_length=255)
    body = models.TextField()
    image = models.ImageField(upload_to='posts', blank=True)
    tags = TaggableManager()
    categories = models.ManyToManyField(Category, related_name='posts')

    def __str__(self):
        return self.title


class Project(TimeStampedModel):
    slug = AutoSlugField(populate_from=['name'], unique=True, editable=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='projects', blank=True)
    date_verb = models.CharField(max_length=50, default='Updated', blank=True)
    date = models.DateField()
    version = models.CharField(max_length=25, blank=True)
    link = models.TextField(blank=True)
    tags = TaggableManager()
    categories = models.ManyToManyField(Category, related_name='projects')

    def __str__(self):
        return self.name
