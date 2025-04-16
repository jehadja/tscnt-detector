export const matchersRegex = {
    GP: /\b(?:gp|dc|dv|std|st|dry(?:\s?(?:van|container|cargo|box|storage))?|general\s?purpose)\b/i,

    HC: /\b(?:hc|hq|hcu|hi[-\s]?cube|high[-\s]?cube|highcube|high\s?container|vh)\b/i,

    RC: /\b(?:rf|rfr|ref|rc|hr|rhc|fhr|reefer|refrigerated|nor|cool|cold)\b/i,

    FR: /\b(?:fr|flt|f\/r|f-r|flat[-\s]?rack|flatrack|rack)\b/i,

    OT: /\b(?:ot|op|opu|open[-\s]?top|hard[-\s]?top|soft[-\s]?top|o-t)\b/i,

    TK: /\b(?:tk|tku|tank(?:tainer)?|tank[-\s]?container|iso[-\s]?tank|liquid[-\s]?container|t-c|tl)\b/i,

    VT: /\b(?:vt|vc|vh|vent(?:ilated)?|vented)\b/i,

    PL: /\b(?:pl|plt|platform|fb|flat[-\s]?bed|flatbed)\b/i,

    BU: /\b(?:bu|bk|bulk(?:[-\s]?container)?|bulk[-\s]?cargo)\b/i,

    HH: /\b(?:hh|half[-\s]?height|halfheight)\b/i,

    LN: /\b(?:ln|liner(?:[-\s]?cargo)?|linerbag)\b/i,

    PW: /\b(?:pw|pallet[-\s]?wide|wide[-\s]?container)\b/i,

    IN: /\b(?:in|ins|pc|tq|thermal|iso(?:thermal)?|insulated|cooling|passive[-\s]?cooling)\b/i,

    SD: /\b(?:sd|os|open[-\s]?side|side[-\s]?door|side[-\s]?access|full[-\s]?side[-\s]?access)\b/i,

    CL: /\b(?:cl|collapsible|foldable|folding)\b/i,

    UC: /\b(?:uc|un[-\s]?containerized|non[-\s]?containerized|break[-\s]?bulk|loose[-\s]?cargo|nocntr|none)\b/i
};

export const containerNameToISOCode: Record<string, string> = {
    'general purpose': 'GP',
    'dry container': 'GP',
    'standard': 'GP',
    'high cube': 'HC',
    'vh': 'HC',
    'reefer': 'RC',
    'refrigerated': 'RC',
    'nor': 'RC',
    'cool': 'RC',
    'cold': 'RC',
    'flat rack': 'FR',
    'rack': 'FR',
    'open top': 'OT',
    'soft top': 'OT',
    'hard top': 'OT',
    'tank': 'TK',
    'tanktainer': 'TK',
    'lined tank': 'TK',
    'ventilated': 'VT',
    'platform': 'PL',
    'flatbed': 'PL',
    'bulk': 'BU',
    'half height': 'HH',
    'liner': 'LN',
    'liner cargo': 'LN',
    'liner bag': 'LN',
    'pallet wide': 'PW',
    'insulated': 'IN',
    'thermal': 'IN',
    'isothermal': 'IN',
    'passive cooling': 'IN',
    'side door': 'SD',
    'open side': 'SD',
    'collapsible': 'CL',
    'folding': 'CL',
    'uncontainerized': 'UC',
    'break bulk': 'UC',
    'loose cargo': 'UC',
    'none': 'UC'
};
