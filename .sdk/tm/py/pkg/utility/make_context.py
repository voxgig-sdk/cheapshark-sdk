# Cheapshark SDK utility: make_context

from projectname_sdk.core.context import CheapsharkContext


def make_context_util(ctxmap, basectx):
    return CheapsharkContext(ctxmap, basectx)
