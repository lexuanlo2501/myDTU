import DefaultLayout from "../Layout/DefaultLayout"
import Header from "../Layout/components/Header"
import QuestionVaultLayout from "../../pages/lecturer question vault";
function QuestionsVault({setUser}){
    return (
        <>
            <Header setUser={setUser} />
            <DefaultLayout>
                <QuestionVaultLayout/>
            </DefaultLayout>
        </>
    )
}

export default QuestionsVault;