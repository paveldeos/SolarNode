import ethereum from '../../assets/ethereum.svg';
import linea from '../../assets/linea.svg';
import node from '../../assets/node.svg';
import Layout from "../../components/Layout/Layout.tsx";

const Nodes = () => {
    return (
        <Layout>
            <div className="container">
                <div className={'select__container'}>
                    <h2 className={'select__title'}>List of nodes</h2>
                    <div className={'select__wrapper'}>
                        <button className={'select__blockhain'}>
                            <img src={node} alt="blockchain"/>
                            <p>Ethereum</p>
                        </button>

                        <button className={'select__blockhain'}>
                            <img src={node} alt="blockchain"/>
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

export default Nodes;
