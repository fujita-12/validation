$(document).ready(function() {
    // バリデーションのルールを定義 start /////////////////////////////////////
    var validationRules = {
        'username-field': {
            required: true,
            minLength: 3,
            maxLength: 15
        },
        'email-field': {
            required: true,
            email: true,
            emailVali: /^\S+@\S+\.\S+$/
        },
        'tel-field': {
            required: true,
            minLength: 6
        }
    };
    //例）'〇〇〇〇-field': {   //バリデーションを追加したい要素のクラス名を定義
    //      required: true,   //必須の場合true
    //      minLength: 3,     //最小文字数
    //      maxLength: 15,    //最大文字数
    //      email: true,      //メールの場合　任意の名称を定義
    //      emailVali: /^\S+@\S+\.\S+$/  //メールのバリデーションルールを定義
    //    }
    // バリデーションのルールを定義 end /////////////////////////////////////
    function validateField(field, showError = true) {   //バリデーションを実行してエラーメッセージを表示、非表示する関数
        var fieldClass = field.attr('class').split(' ').find(function(cls){ return cls.endsWith('-field')}); //クラス名の末に-fieldのついたクラス名を取得
        var value = field.val().trim(); //valueの値を取得
        var rules = validationRules[fieldClass];  //validationRulesのオブジェクトから適用するルールを取得
        var isValid = true; //フラグをtrueに
        var errorMessage = '';  //空を代入

        if(rules.required && value === '') { //必須かつ入力が空だった場合　(以下必要なバリデーションを追加していく)
            isValid = false;    //フラグをfalseに
            errorMessage = '必須項目です。'; //エラーメッセージを代入
        }else if (rules.minLength && value.length < rules.minLength) {
            isValid = false;
            errorMessage = `${rules.minLength}文字以上で入力してください。`;
        }else if (rules.maxLength && value.length > rules.maxLength) {
            isValid = false;
            errorMessage = `${rules.maxLength}文字以内で入力してください。`;
        }else if (rules.email && !rules.emailVali.test(value)) {
            isValid = false;
            errorMessage = 'メールアドレスの形式が間違っています。';
        }

        var errorElement = $(`.error-message.${fieldClass.replace('-field', '-error')}`);   //-fieldを-errorに変えてエラーメッセージの要素を取得
        
        if (!isValid && showError) {
            errorElement.text(errorMessage).show();
        } else if (showError) {
            errorElement.hide();
        }

        return isValid;
        
    }

    function validateForm(showErrors = true) {
        var isFormValid = true;
        $('.form-area').each(function() {
            var field = $(this);
            if (!validateField(field, showErrors)) {
                isFormValid = false;
            }
        });
        return isFormValid;
    }
    
    function formValidate(showErrors = true) {
        var isFormValid = validateForm(showErrors);
        if (isFormValid) {
            $("#submit").removeClass("disabled");
        } else {
            $("#submit").addClass("disabled");
        }
    }

    // 各フィールドのblurイベントのハンドラー
    $('.form-area').on('blur', function() {
        validateField($(this));
        formValidate(false);
    });

    formValidate(false);
});
