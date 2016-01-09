var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");
editor.getSession().setUseWorker(false);
editor.getSession().setUseWrapMode(true);
editor.getSession().setWrapLimitRange(50, 50);
editor.setOptions({
    maxLines: 20,
    minLines: 20
});