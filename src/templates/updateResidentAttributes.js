_.each(it, (attr) => {
  if (!attr.isErratic) {
    if (attr.isDirect) {
      // {{
      _et.${attr.key} = '${_.translateMarks(attr.value)}';
      // }}
    } else {
      // {{
      _util.setAttribute(_et, '${_.translateMarks(attr.key)}', '${_.translateMarks(attr.value)}');
      // }}
    }
  }
})