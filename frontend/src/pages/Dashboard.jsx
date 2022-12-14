import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Spinner from '../components/Spinner'
import GoalForm from "../components/GoalForm"
import { getGoals, reset } from "../features/goals/goalSlice"
import GoalItem from "../components/GoalItem"

const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const {user} = useSelector((state)=>state.auth)
    const {goals, isLoading,isError, message} = useSelector((state)=>state.goals)

    useEffect(()=>{
      
      console.log(isError,'---------error----')

        if(!user){
            console.log(user)
            navigate('/login')
        }

        dispatch(getGoals())

        return ()=>{
            dispatch(reset())
        }
    },[user])

    if(isLoading){
        return (<Spinner/>)
    }
    return (
        <>  
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
            </section>
            <GoalForm/>
            <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
        </>
    )
}

export default Dashboard