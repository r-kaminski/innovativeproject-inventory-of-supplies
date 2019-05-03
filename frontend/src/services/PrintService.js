import Axios from 'axios'

class PrintService {

    static addToQueue(supplyId) {
        return Axios.post('api/printing/queue/', { supplyId: supplyId });
    }
    static getQueue() {
        return Axios.get('api/printing/queue')
    }
    static removeFromQueue(printId) {
        return Axios.delete(`api/printing/queue/${printId}`)
    }
    static clearQueue() {
        return Axios.delete('api/printing/queue')
    }
}
export default PrintService;
