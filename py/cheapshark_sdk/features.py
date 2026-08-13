# Cheapshark SDK feature factory

from cheapshark_sdk.feature.base_feature import CheapsharkBaseFeature
from cheapshark_sdk.feature.test_feature import CheapsharkTestFeature


def _make_feature(name):
    features = {
        "base": lambda: CheapsharkBaseFeature(),
        "test": lambda: CheapsharkTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
