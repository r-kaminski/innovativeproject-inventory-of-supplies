import Axios from 'axios'

class BackupService {
    static getBackups() {
        return Axios.get('api/backup/');
    }
    static createBackup() {
        return Axios.post('api/backup/');
    }
    static restoreBackup(name) {
        return Axios.patch('api/backup/', { name: name })
    }
}
export default BackupService;
