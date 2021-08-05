const mongoose = require('mongoose');

const HomeTitleSchema = new mongoose.Schema({
    titulo: { type: String, required: true }
});

const HomeModel = mongoose.model('HomeTitle', HomeTitleSchema);

class Home {
    constructor(title) {
        this.titulo = title;
    }

    save() {
        HomeModel.create({ titulo: this.titulo});
    }
}
module.exports = Home;