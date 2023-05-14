import {useEffect, useState} from 'react';
import {Web3Provider} from '@ethersproject/providers';

declare global {
    interface Window {
        ethereum: any;
    }
}

export function useEthereum() {
    const [account, setAccount] = useState<string | null>(null);

    useEffect(() => {
        const savedAccount = localStorage.getItem('account');
        if (savedAccount) {
            setAccount(savedAccount);
        }

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts: string[]) => {
                localStorage.setItem('account', accounts[0]);
                setAccount(accounts[0]);
            });
        } else {
            localStorage.removeItem('account'); // Remove the account from local storage if window.ethereum is not available
            setAccount(null);
        }
    }, []);

    const connect = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
                localStorage.setItem('account', accounts[0]);
                setAccount(accounts[0]);
                const provider = new Web3Provider(window.ethereum);
                const signer = provider.getSigner();
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
