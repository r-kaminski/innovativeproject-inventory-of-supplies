import Axios from 'axios'

class PrintService {

    static addToQueue(supplyId) {
        return Axios.post('api/printing/', { supplyId: supplyId });
    }
    static getQueue() {
        return Axios.get('api/printing')
    }
    static removeFromQueue(printId) {
        return Axios.delete(`api/printing/${printId}`)
    }
}
export default PrintService;
