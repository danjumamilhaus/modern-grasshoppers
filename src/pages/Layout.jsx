import React from 'react';

var TasksLayout = (props) => (

    <div>
      Signed in as {props.currentUser}
      <div className='container content'>
        <div>
          <UserSignout
            signout={props.signout.bind(this)}
          />
        </div>
        <div className='container form'>

          <TaskEntry
            handleChange={props.handleChange}
            handleSubmit={props.handleSubmit}
          />

        </div>

        { /*TODO: Change className?*/ }
        <div className="container tasks">

          <CurrentTasksView
            task={props.currentTaskArray}
            onStartButtonClick={props.onStartButtonClick}
            onStopButtonClick={props.onStopButtonClick}
          />

        </div>

        <div className='container tasks'>
          <CompletedTaskList
            tasks={props.tasks}
          />

        </div>
      </div>
    </div>
)

//window.Layout = Layout;
export default TasksLayout;