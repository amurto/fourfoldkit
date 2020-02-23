import React from 'react';
import SimpleCard from './cards';

const JobList = props => {
    if (props.items.length === 0) {
        return <div className="center">
            <div>
                <h2>No Jobs found.</h2>
            </div>
        </div>
    }
    return (
            <React.Fragment>
                {props.items.map(job => 
                    <SimpleCard 
                        key={job.id} 
                        id={job.id}
                        perks={job.perks}
                        org={job.org}
                        skills={job.skills}
                        designation={job.designation}
                        salary={job.salary}
                        address={job.address}
                        info={job.info}
                        phone={job.phone}
                        openings={job.openings}
                        deadline={job.deadline}
                        date={job.date}
                    />
                )}
            </React.Fragment>
    )
};

export default JobList;