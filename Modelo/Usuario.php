<?php
    class Usuario{
        public $idUsuario;
        public $password;
        public $correo;
        public $tipoUsuario;
        public $estatusUsuario;
        
        function __construct($idUsuario, $password, $correo, $tipoUsuario, $estatusUsuario) {
            $this->idUsuario = $idUsuario;
            $this->password = $password;
            $this->correo = $correo;
            $this->tipoUsuario = $tipoUsuario;
            $this->estatusUsuario = $estatusUsuario;
        }
        /*
        function getIdUsuario() {
            return $this->idUsuario;
        }

        function getContraseña() {
            return $this->contraseña;
        }

        function getCorreo() {
            return $this->correo;
        }

        function getTipoUsuario() {
            return $this->tipoUsuario;
        }

        function getEstatusUsuario() {
            return $this->estatusUsuario;
        }

        function setIdUsuario($idUsuario) {
            $this->idUsuario = $idUsuario;
        }

        function setContraseña($contraseña) {
            $this->contraseña = $contraseña;
        }

        function setCorreo($correo) {
            $this->correo = $correo;
        }

        function setTipoUsuario($tipoUsuario) {
            $this->tipoUsuario = $tipoUsuario;
        }

        function setEstatusUsuario($estatusUsuario) {
            $this->estatusUsuario = $estatusUsuario;
        }
        */
        
        
    }

