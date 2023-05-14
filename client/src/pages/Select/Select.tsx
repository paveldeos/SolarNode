import ethereum from '../../assets/ethereum.svg';
import filecoin from '../../assets/filecoin.svg';
import gnosis from '../../assets/gnosis.svg';
import linea from '../../assets/linea.svg';
import Layout from "../../components/Layout/Layout.tsx";
import './Select.scss';

const Select = () => {
    const onSelect = () => {
    }

    return (
        <Layout>
            <div className="container">
                <div className={'select__container'}>
                    <h2 className={'select__title'}>Select blockhain</h2>
                    <div className={'select__wrapper'}>
                        <button className={'select__blockhain'}>
                            <img src={gnosis} alt="blockchain"/>
                            <p>Gnosis</p>
                        </button>

                        <button className={'select__blockhain'}>
                            <img src={filecoin} alt="blockchain"/>
                            <p>Filecoin</p>
                        </button>

                        <button className={'select__blockhain'}>
                            <img src={linea} alt="blockchain"/>
                            <p>Linea</p>
                        </button>

                        <button className={'select__blockhain'}>
                            <img src={ethereum} alt="blockchain"/>
                            <p>Ethereum</p>
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Select;
