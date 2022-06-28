class categories{
    constructor(image, _id, id, name, page_description, page_title, parent_category_id){
        this.image= image;
        this._id = id;
        this.id = id;
        this.name = name;
        this.page_description = page_description;
        this.page_title = page_title;
        this.parent_category_id = parent_category_id;
    }
}
module.exports = categories