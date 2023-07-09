export default class Guides{
    constructor(data = {}) {
        this.userId = data.userId || '',

        this.feature = data.feature || '',
        this.title = data.title || '',
        this.content = data.content || '',
        
        this.feature_kh = data.feature_kh || '',
        this.title_kh = data.title_kh || '',
        this.content_kh = data.content_kh || ''

        this.topic = data.topic || '',
        this.product = data.product || '',
        this.category_type = data.category_type || ''
        this.type = data.type || 'resource',
        this.status = data.status || 1
        
        this.image = data.image || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}