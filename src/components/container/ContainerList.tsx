import { useEffect, useState } from 'react'
import ContainerListItem from './ContainerListItem'
import { useAuth } from '../security/AuthContext';
import { ContainerService } from '../../services/ContainerService';
import type { Container } from '../../types/containerTypes';



const ContainerList = () => {
  const { keycloak } = useAuth();
  const [containers, setContainers] = useState<Container[]>([]);
  useEffect(()=>{
    const loadContainers = async () =>{
      setContainers(await ContainerService.getContainerList(keycloak));

    }
    loadContainers();
  }, []);
    
  return (
    <div>
        <h2>contianers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            containers.map(container => (
              <ContainerListItem container={container}></ContainerListItem>
            ))
          }
        </div>

    </div>

  )
}

ContainerList.propTypes = {}

export default ContainerList