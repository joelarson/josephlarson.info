from django.db import models

from taggit.managers import TaggableManager


class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'categories'


class Project(models.Model):
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
