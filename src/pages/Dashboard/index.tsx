import React, { useState, FormEvent } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import api from '../../service/api'

import logoImg from '../../assets/logo.svg'
import Respository from '../Repository'

import { Title, Form, Respositories } from './styles'

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    }
}

const Dashboard: React.FC = () => {

    const [newRepo, setNewRepo] = useState('');

    const [repositories, setRepositories] = useState<Repository[]>([]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        const response = await api.get<Repository>(`repos/${newRepo}`);

        const repository = response.data;

        setRepositories([...repositories, repository]);

        setNewRepo('');
    }


    return (
        <>
            <img src={logoImg} alt="Github Explorer" />
            <Title>Explore Repositórios no GitHub</Title>

            <Form onSubmit={handleAddRepository}>
                <input value={newRepo} onChange={(e): void => setNewRepo(e.target.value)}
                    placeholder="Digite o nome do Repositorio" />
                <button type="submit">Pesquisar</button>
            </Form>

            <Respositories>
                {repositories.map(repository => (
                    <a key={repository.full_name} href="teste">
                        <img src={repository.owner.avatar_url} alt={repository.owner.login} />

                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description} </p>
                        </div>



                        <FiChevronRight size={20} />
                    </a>))}
            </Respositories>

        </>
    );
}
export default Dashboard