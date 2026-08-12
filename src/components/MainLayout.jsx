import HeaderBar from "./HeaderBar"

function MainLayout({ children, title }) {
    return ( 
        <>
            <div className="min-h-screen bg-slate-900">
                <HeaderBar title={title}/>
                { children }
            </div>
        </>
    )
} 

export default MainLayout