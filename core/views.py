from django.shortcuts import render
from django.http import Http404

from projects.models import Project
from categories.models import Category


def activity(request):
    context = _get_base_context('Activity')
    return render(request, 'activity.html', context)


def projects(request):
    context = _get_base_context('Projects')
    return render(request, 'projects.html', context)


def thoughts(request):
    context = _get_base_context('Thoughts')
    return render(request, 'thoughts.html', context)


def about_me(request):
    context = _get_base_context('About Me')
    return render(request, 'about-me.html', context)


def _get_base_context(page_title):
    base_context = {
        'page_title': page_title,
        'navigation': [
            {'display': 'Activity', 'href':'/',
             'selected': True if page_title == 'Activity' else False},
            {'display': 'Projects', 'href':'/projects/',
             'selected': True if page_title == 'Projects' else False},
            {'display': 'Thoughts', 'href':'/thoughts/',
             'selected': True if page_title == 'Thoughts' else False},
            {'display': 'About Me', 'href':'/about-me/',
             'selected': True if page_title == 'About Me' else False},
        ],
        'categories': Category.objects.all(),
    }

    return base_context
