import ButtonGlobal from 'core/components/ButtonGlobal';
import { Perfil } from 'core/types/Perfil';
import { makeRequest } from 'core/utils/request';
import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ImageLoader from './components/Loaders/ImageLoader';
import InfoLoader from './components/Loaders/InfoLoader';
import './styles.css';

type FormState = {
  search: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement>;

const Search = () => {
  const [perfil, setPerfil] = useState<Perfil>();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    search: '',
  });

  const FormatDate = (date: string) => {
    const parsedDate = parseISO(date);
    return format(parsedDate, 'dd/MM/yyyy');
  }

  const handleOnChange = (event: FormEvent) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    makeRequest({ url: `${formData.search}`, method: 'GET' })
      .then(response => {
        setPerfil(response.data);
        setFormData({ search: '' });
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <div className="search-container">
        <div className="search-content card-base border-radius-15">
          <h1 className="search-text-title">
            Encontre um perfil Github
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              value={formData.search}
              name="search"
              type="text"
              onChange={handleOnChange}
              className="search-input search-placeholder"
              placeholder="Usuário GitHub"
            />
            <ButtonGlobal text="Encontrar" />
          </form>
        </div>
      </div>

      {!perfil ? '' : (
        <div className="search-perfil-container">
          <div className="search-perfil-profile">
            {isLoading ?
              <>
                <ImageLoader />
                <div className="search-infoloader">
                  <InfoLoader />
                </div>
              </> : (
                <>
                  <div className="search-img-profile">
                    <img src={perfil?.avatar_url} className="search-image" />
                  </div>

                  <div className="search-estatistica-container background-base entre-espacamento-profile">
                    <div className="search-rectangle-publicos">
                      <h5 className="search-rectangle-text">Repositórios públicos: {perfil?.public_repos}</h5>
                    </div>
                  </div>
                  <div className="search-estatistica-container background-base entre-espacamento">
                    <div className="search-rectangle-seguidores">
                      <h5 className="search-rectangle-text">Seguidores: {perfil?.followers}</h5>
                    </div>
                  </div>
                  <div className="search-estatistica-container background-base entre-espacamento">
                    <div className="search-rectangle-seguindo">
                      <h5 className="search-rectangle-text">Seguindo: {perfil?.following}</h5>
                    </div>
                  </div>
                  <div className="background-base search-result-area-container">
                    <div className="search-result-area-content">
                      <h5 className="search-result-area-title">Informações</h5>
                      <div className="search-result-info background-base">
                        <h5 className="search-result-info-text">Empresa: {perfil?.company}</h5>
                      </div>
                      <div className="search-result-info background-base">
                        <h5 className="search-result-info-text">Website/Blog: {perfil?.blog}</h5>
                      </div>
                      <div className="search-result-info background-base">
                        <h5 className="search-result-info-text">Localidade: {perfil?.location}</h5>
                      </div>
                      <div className="search-result-info background-base">
                        <h5 className="search-result-info-text">Membro desde: {FormatDate(perfil?.created_at)}</h5>
                      </div>
                    </div>
                  </div>
                </>
              )}
          </div>
          <a href={perfil.html_url} target="_blank" className="btn-ver-perfil">
            <ButtonGlobal text="Ver perfil" />
          </a>
        </div>
      )}
    </>
  );
}



export default Search;
