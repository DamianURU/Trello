const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectsSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    done:{
        type: String,
        default: 'false',
    },
    creator:{
        type: String
    },
    users:[{
        user:{
            type: String
        },
    }],
    lists:[{
        name:{
            type: String,
        },
        description:{
            type: String,
        },
        done:{
            type:String,
            default: 'false'
        },
        sublists:[{              
            name:{
                type: String
            },
            description:{
                type: String,
            },                    
            done:{
                type:String,
                default: 'false'
            },                 
        }],
    }],
}, {
    timestamps: true,
});

const Projects = mongoose.model('Projects', ProjectsSchema);

module.exports = Projects;