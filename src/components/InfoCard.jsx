function InfoCard({title, icon: Icon, iconColor, valueColor, value}) {
    return (
        <div className="w-full max-w-sm sm:w-80 lg:w-85 p-9 bg-slate-800 text-2xl text-slate-100 rounded-2xl">

          <div className="flex flex-row justify-between ">

            <p>{title}</p>

            <Icon size={38} className={iconColor}/>

          </div>
          
          <p className={`font-bold ${valueColor}`}>{value}</p>

        </div>
    )
}

export default InfoCard;