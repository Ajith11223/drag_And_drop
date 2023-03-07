import React, { useEffect, useRef, useState } from "react"
import "./App.css"

function App() {
	const [fruitItems, setFruitItems] =useState([
		[{sub:"Enlish"},[["module1",[["topic1",["sub1","sub2","sub3"]],["Topic2"],["topic3"]]],["module2",[["topic2"]]],["module3",[["topic3"]]]]],
		[{sub:"Maths"},[["module4",[["topic4"]]],["module5",[["topic5"]]],["module6",[["topic6"]]]]],
		[{sub:"Sceince"},[["module7",[["topic7"]]],["module8",[["topic8"]]],["module9",[["topic9"]]]]],
	])
	const [newFruitItem, setNewFruitItem] = useState("")

	//save reference for dragItem and dragOverItem
	const dragItem = useRef(null)
	const dragOverItem = useRef(null)

	//Module
	const dragItemModule = useRef(null)
	const dragOverItemModule = useRef(null)


	// topic
	const dragItemTopic = useRef(null)
	const dragOverItemTopic = useRef(null)


	//sub topic
	const dragItemSubTopic = useRef(null)
	const dragOverItemSubTopic = useRef(null)
	

	//const handle drag sorting
	const handleSort = () => {
		//duplicate items
		let _fruitItems = [...fruitItems]

		//remove and save the dragged item content
		const draggedItemContent = _fruitItems.splice(dragItem.current, 1)[0]

		//switch the position
		_fruitItems.splice(dragOverItem.current, 0, draggedItemContent)

		//reset the position ref
		dragItem.current = null
		dragOverItem.current = null

		//update the actual array
		setFruitItems(_fruitItems)
	}


	/// topic
	const [render,setRender]=useState(2)
	
	const handleSortModule = (ind,nam) => {
		
		setRender(render + 1)
		if(fruitItems[ind][0].sub === nam){
			//duplicate items
		let TopicItem = [...fruitItems[ind][1]]
		//remove and save the dragged item content
		const draggedItemContentModule = TopicItem.splice(dragItemModule.current, 1)[0]
		// console.log(draggedItemContentModule)

		//switch the position
		TopicItem.splice(dragOverItemModule.current, 0, draggedItemContentModule)

		//reset the position ref
		dragItemModule.current = null
		dragOverItemModule.current = null

		
		fruitItems[ind][1]=TopicItem
		}
		
		
	}

	//sort topic
	const handleSortTopic =(ind,name,j)=>{
		setRender(render + 1)

	//duplicate items
	let TopicItem = [...fruitItems[ind][1][j][1]]

	//remove and save the dragged item content
	const draggedItemContentTopic = TopicItem.splice(dragItemTopic.current, 1)[0]

	//switch the position
	TopicItem.splice(dragOverItemTopic.current, 0, draggedItemContentTopic)
	//reset the position ref
	dragItemTopic.current = null
	dragOverItemTopic.current = null

	fruitItems[ind][1][j][1]=TopicItem
	}



//sort sub topic
const handleSortSubTopic =(ind,name,j,k)=>{
	setRender(render + 1)

let TopicItem = [...fruitItems[ind][1][j][1][k][1]]

const draggedItemContentSubTopic = TopicItem.splice(dragItemSubTopic.current, 1)[0]

TopicItem.splice(dragOverItemSubTopic.current, 0, draggedItemContentSubTopic)

dragItemSubTopic.current = null
dragOverItemSubTopic.current = null

fruitItems[ind][1][j][1][k][1]=TopicItem
}


// edit subject
const [edit,setEdit]= useState("")
const [open,setopen] = useState(false)
const handleEdit =()=>{
	setopen(true)
}

// handle submit
const handleSubmit =(id)=>{
	
	fruitItems.map((item,i)=>{
		if(id === i){
			console.log(item[0])
			item[0].sub = edit
		}
	})
	setopen(false)
}


//handleEditChange
const handleEditChange =(e)=>{
	console.log(e.target.value)
	setEdit(e.target.value)
}

	//handle name change
	const handleNameChange = (e) => {
		setNewFruitItem(e.target.value)
	}

	//handle new item addition
	const handleAddItem = () => {
		fruitItems.push([{sub:newFruitItem}])
		setRender(render + 1)
	}

	useEffect(()=>{

	},[render])


	// create new module
	const [createModule,setCreateModule]=useState(false)
	const moduleAdd =()=>{
		
		setCreateModule(true)
	}


	// handle create
	const handleCreate=(id)=>{
    alert(id)
	}
	return (
		<>
		<div className="app">
			<h2>Add course</h2>
			<div className="input-group">
				<input
					type="text"
					name="fruitName"
					placeholder="e.g English"
					onChange={handleNameChange}
				/>
				<button className="btn" onClick={handleAddItem}>
					Add item
				</button>
			</div>

			{/** List container //TODO break into component */}
			<div className="list-container">

				
				{fruitItems.map((item, index) => (
					<>
					
					<div
						key={index}
						className="list-item "
						draggable
						onDragStart={(e) => (dragItem.current = index)}
						onDragEnter={(e) => (dragOverItem.current = index)}
						onDragEnd={handleSort}
						onDragOver={(e) => e.preventDefault()}>
						<i >subject</i> 
						
						<div >
						<h3>{item[0]?.sub}</h3>
						<button style={{fontSize:"18px"}} onClick={()=>handleEdit(index)} >Edit Subject</button> 
						<button onClick={moduleAdd} style={{position:"relative",left:"30px",fontSize:"18px"}}>Add Module</button>
						</div>
						{
							open?<div>
							<input type="text" name="" id="" onChange={handleEditChange} />
							<button onClick={()=>handleSubmit(index)}>submit</button>
						</div>:""
						}

						{
								createModule?<div>
								<input type="text" name="" id="" onChange={handleEditChange} />
								<button onClick={()=>handleCreate(index)}>submit</button>
							</div>:""
							
						}
					</div>
						{
							item[1]?.map((items,j)=>{
								return(
									<>
									<div key={j} draggable className="module"
									onDragStart={(e)=>dragItemModule.current=j}
									onDragEnter={(e)=>dragOverItemModule.current=j}
									onDragEnd={()=>handleSortModule(index,item[0].sub)}
									>
									<div style={{backgroundColor:"red"}}>
									<span>module</span> 
									<h3 >{items[0]}</h3>
									</div>
									</div>

									{/* topic area */}

						            {
										items[1]?.map((it,k)=>{
								
											
											return(
												<>
												<div key={k} draggable
												className="topic"
									onDragStart={(e)=>dragItemTopic.current=k}
									onDragEnter={(e)=>dragOverItemTopic.current=k}
									onDragEnd={()=>handleSortTopic(index,items,j)}
									>
									<div style={{backgroundColor:"blue"}}>
									<span>Topic</span>
									<h3 >{it[0]}</h3>
									</div>
									</div>

									{
										it[1]?.map((its,m)=>{
											return(
												<>
															<div key={m} draggable
															className="sub"
									onDragStart={(e)=>dragItemSubTopic.current=m}
									onDragEnter={(e)=>dragOverItemSubTopic.current=m}
									onDragEnd={()=>handleSortSubTopic(index,items,j,k)}
									>
									<div style={{backgroundColor:"green"}}>
									<span>subTopic</span>
									<h3 >{its}</h3>
									</div>
									</div>
												</>
											)
										})
									}

												</>
											)
										})
									}
									</>
								)
							})
						}

						
					</>
				))}
			</div>
		</div>
		</>
	)
}

export default App
