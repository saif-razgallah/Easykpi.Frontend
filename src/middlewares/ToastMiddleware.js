import { toast } from 'react-toastify';
import { editUser, editUserError, newUser, deleteUser, editPasswordError, editPasswordSuccess } from '../redux/userSlice';
import { loginError } from '../redux/authenticationSlice';
import { newReport, editReport, deleteReport } from '../redux/reportSlice'
import { newDataWH, editDataWH, deleteDataWH } from '../redux/datawhSlice'
import { newAccessDatawh, editAccessDatawh, deleteAccessDatawh } from '../redux/accessDatawhSlice'
import { newAccessReport, editAccessReport, deleteAccessReport } from '../redux/accessReportSlice'
import { newDashboard, deleteDashboard } from '../redux/dashboardSlice'




const ToastMiddleware = () => next => action => {
    switch (action.type) {
        case newDashboard.type:
            toast.success('Ajouté avec succès');
            break;
        case deleteDashboard.type:
            toast.success('Supprimé avec succès');
            break;
        case editPasswordSuccess.type:
            toast.success('Edité avec succès');
            break;
        case newAccessReport.type:
            toast.success('Ajouté avec succès');
            break;
        case editAccessReport.type:
            toast.success('Edité avec succès');
            break;
        case deleteAccessReport.type:
            toast.success('Supprimé avec succès');
            break;
        case newAccessDatawh.type:
            toast.success('Ajouté avec succès');
            break;
        case editAccessDatawh.type:
            toast.success('Edité avec succès');
            break;
        case deleteAccessDatawh.type:
            toast.success('Supprimé avec succès');
            break;
        case newDataWH.type:
            toast.success('Ajouté avec succès');
            break;
        case editDataWH.type:
            toast.success('Edité avec succès');
            break;
        case deleteDataWH.type:
            toast.success('Supprimé avec succès');
            break;
        case editUser.type:
            toast.success('Edité avec succès');
            break;
        case newReport.type:
            toast.success('Ajouté avec succès');
            break;
        case editReport.type:
            toast.success('Edité avec succès');
            break;
        case deleteReport.type:
            toast.success('Supprimé avec succès');
            break;
        case newUser.type:
            toast.success('Ajouté avec succès');
            break;
        case deleteUser.type:
            toast.success('Supprimé avec succès');
            break;
        case editUserError.type:
            toast.error("nom d'utilisateur déjà pris");
            break;
        case editPasswordError.type:
            toast.error("mot de passe incorrect");
            break;
        case loginError.type:
            toast.error('Email et/ou mot de passe incorrect(s)');
            break;
        default:
            break;
    }
    return next(action);
}

export default ToastMiddleware;
