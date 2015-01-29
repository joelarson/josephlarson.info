from __future__ import unicode_literals

from django.db import models

from taggit.managers import TaggableManager

from categories.models import Category


class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/images')
    date = models.DateField()
    link = models.TextField()

    tags = TaggableManager()
    categories = models.ManyToManyField(Category, related_name='projects')

    def __unicode__(self):
        return self.name
