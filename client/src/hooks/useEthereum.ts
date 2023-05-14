import {useEffect, useState} from 'react';
import {Web3Provider} from '@ethersproject/providers';
import {useNavigate} from 'react-router-dom';

declare global {
    interface Window {
        ethereum: any;
    }
}

export function useEthereum() {
    const [account, setAccount] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts: string[]) => {
                setAccount(accounts[0]);
            });
        }
    }, []);

    const connect = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
                setAccount(accounts[0]);
                const provider = new Web3Provider(window.ethereum);
                const signer = provider.getSigner();

                // Redirect to another page after successfully connecting
                navigate("/select-blockchain");

                return {account, signer};
            } catch (err) {
                console.error(err);
            }
        } else {
            console.log('Please install MetaMask!');
        }
    };

    return {connect, account};
}
