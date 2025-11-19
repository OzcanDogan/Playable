const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register işlemi için gerekli fonskiyon 
exports.register = async (req, res) => {
    try{
    const { name, email, password } = req.body;
    const userExists= await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'Email zaten kullanımda.Lütfen giriş yapmayı veya başka bir email kullanmayı deneyin' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User ({name , email, password: hashedPassword });
    res.json({ message: 'Kullanıcı başarıyla kayıt oldu', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    await user.save();  


    }catch (error) {
        console.error('Kayıt işlemi başarısız:', error.message);
        res.status(500).json({ message: 'Kayıt işlemi sırasında bir hata oluştu' });
    }
;}
// Login işlemi için gerekli fonksiyon
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Geçersiz email veya şifre' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Hatalı Şifre Girildi.Lütfen Tekrar Deneyin.' });
        }
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token ,  message: 'Giriş Başarılı' ,  user: { id: user._id, name: user.name, email: user.email, role: user.role }});
       
    } catch (error) {
        console.error('Giriş işlemi başarısız:', error.message);
        res.status(500).json({ message: 'Giriş işlemi sırasında bir hata oluştu'
         });

    }


        }
