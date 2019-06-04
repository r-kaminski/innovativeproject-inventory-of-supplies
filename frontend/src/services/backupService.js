import Axios from 'axios'

class BackupService {

    static getBackups() {
        return Axios.get('api/backup/');
    }
    static createBackup() {
        return Axios.post('api/backup/');
    }

}
export default BackupService;
