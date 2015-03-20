from django.shortcuts import render
from django.http import Http404

from projects.models import Project
from categories.models import Category


def activity(request):
    context = _get_base_context()

    return render(request, 'activity.html', context)


def projects(request):
    context = _get_base_context()

    if projects.count() is 0:
        raise Http404('Listen to my 404 song...')

    context['projects'] = projects

    return render(request, '_base.html', context)


def _get_base_context():
    categories = Category.objects.all()

    base_context = {
        'categories': categories,
    }

    return base_context
