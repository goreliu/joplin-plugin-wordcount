joplin.plugins.register({
    onStart: async function() {
        const dialogs = joplin.views.dialogs;
        const dialogHandle = await dialogs.create('WordCount');

        await joplin.commands.register({
            name: 'WordCount',
            label: 'Word Count',
            // https://fontawesome.com/v5/search
            iconName: 'fab fa-wpforms',
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
                    + ' <br>中文标点：' + punArr.length
                    + ' <br>汉字 + 中文标点：' + String(chArr.length + punArr.length)
                    + ' <br>英文：' + enArr.length
                    + ' <br>数字：' + numberArr.length
                    + ' <br>总数：' + String(chArr.length + punArr.length + enArr.length);
                // alert(output);
                dialogs.setHtml(dialogHandle, '<div style="font-size: 1.5em">' + output + '<\/div>');
                dialogs.open(dialogHandle);
            },
        });

        await joplin.views.toolbarButtons.create('WordCountButton', 'WordCount', 'editorToolbar');

        await joplin.views.menuItems.create('WordCountMenu', 'WordCount');
    },
});
