export const useInputValidation = () => {

    const validateEmail = (email: string) => {
        if (!email) {
            return "Email tidak boleh kosong.";
        }
        const regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!regex.test(email)) {
            return "Masukkan email yang valid.";
        }
        return "";
    };

    const validatePassword = (password: string, typeForm: string) => {
        if (!password) {
            return "Password tidak boleh kosong.";
        }
        if (password.length < 8 && typeForm === 'register') {
            return "Password minimal 8 karakter.";
        }

        return "";
    };

    const validateConfirmPassword = (password: string, konfirmasi_password: string) => {
        if(konfirmasi_password != password) {
            return "Password tidak sama."
        }

        if(!konfirmasi_password) {
            return "Konfirmasi Password tidak boleh kosong."
        }
    }

    return { validateEmail, validatePassword, validateConfirmPassword };
};