/**
 * Created by ahtasham on 07/02/15.
 */

//Change profession on update page
function changeProfState() {
    var proStatus = $('#selectProfession').val();
    switch (proStatus){
        case 'professional':
            $('#frmProfession').attr('placeholder', 'Eg: Electrical Engineer');
            $('#at').text('Company');
            $('#frmOrganisation').attr('placeholder', 'Eg: Masology, Inc');
            break;
        case 'student':
            $('#frmProfession').attr('placeholder', 'Eg: 3rd semester or 4th year');
            $('#at').text('Institute');
            $('#frmOrganisation').attr('placeholder', 'Eg: Harvard University');
            break;
        default:
            $('#frmProfession').attr('placeholder', 'Eg: Electrical Engineer');
            $('#at').text('Company');
            $('#frmOrganisation').attr('placeholder', 'Eg: Masology, Inc');
            break;
    }
}
