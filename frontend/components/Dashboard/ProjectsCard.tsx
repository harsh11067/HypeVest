import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  LinearProgress,
  Avatar,
  AvatarGroup,
  Chip,
} from '@mui/material';

interface Project {
  id: string;
  name: string;
  members: string[];
  budget: string;
  completion: number;
  status: 'active' | 'completed' | 'pending';
}

interface ProjectsCardProps {
  projects: Project[];
  title: string;
  totalDone: number;
}

const ProjectsCard: React.FC<ProjectsCardProps> = ({ projects, title, totalDone }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#1B73E8';
      case 'completed': return '#00C851';
      case 'pending': return '#FFB800';
      default: return '#A0AEC0';
    }
  };

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #FF3D7115 0%, #E91E6305 100%)',
        border: '1px solid #FF3D7130',
        borderRadius: '12px',
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ color: 'white', mb: 3, fontWeight: 600 }}>
          {title} {totalDone} done this month
        </Typography>

        {projects.map((project, index) => (
          <Box key={project.id} sx={{ mb: index < projects.length - 1 ? 3 : 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
                {project.name}
              </Typography>
              <Chip
                label={project.status}
                size="small"
                sx={{
                  backgroundColor: `${getStatusColor(project.status)}20`,
                  color: getStatusColor(project.status),
                  border: `1px solid ${getStatusColor(project.status)}30`,
                  textTransform: 'capitalize',
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: '#A0AEC0', mr: 2 }}>
                  MEMBERS
                </Typography>
                <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.75rem' } }}>
                  {project.members.map((member, idx) => (
                    <Avatar key={idx} sx={{ backgroundColor: '#1B73E8' }}>
                      {member.charAt(0)}
                    </Avatar>
                  ))}
                </AvatarGroup>
              </Box>
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                BUDGET {project.budget}
              </Typography>
            </Box>

            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                  COMPLETION
                </Typography>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                  {project.completion}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={project.completion}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#2D3748',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#FF3D71',
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProjectsCard;
