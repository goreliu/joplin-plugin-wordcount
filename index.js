joplin.plugins.register({
    onStart: async function() {
        await joplin.commands.register({
            name: 'WordCount',
            label: 'Word Count',
            iconName: 'fas fa-music',
            execute: async () => {
                const note = await joplin.workspace.selectedNote();
                const regMap = {
                // 中文
                "Chinese": /[\u4e00-\u9fa5]/g,
                // 中文标点符号
                "ChPunctuation": /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g,
                // 英文（含英文状态下的数字、符号、标点）
                "English": /[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F\d\s\w]/g,
                // 数字
                "Number": /\d/g
                };

                let content = note.body;
                content = content.replaceAll('#', '').replaceAll('\n', '').replaceAll(' ', '');
                const chArr = content.match(regMap['Chinese']) || [];
                const punArr = content.match(regMap['ChPunctuation']) || [];
                const enArr = content.match(regMap['English']) || [];
                const numberArr = content.match(regMap['Number']) || [];
                const output = '汉字：' + chArr.length
                    + ' \n中文标点：' + punArr.length
                    + ' \n汉字 + 中文标点：' + String(chArr.length + punArr.length)
                    + ' \n英文：' + enArr.length
                    + ' \n数字：' + numberArr.length
                    + ' \n总数：' + String(chArr.length + punArr.length + enArr.length);
                alert(output);
            },
        });

        await joplin.views.toolbarButtons.create('WordCount', 'WordCount', 'editorToolbar');
    },
});
